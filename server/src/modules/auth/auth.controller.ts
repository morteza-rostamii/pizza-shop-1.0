import bcrypt from 'bcryptjs' 
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken' 
import prisma from '../../config/prisma';

class AuthController {

  static async register(req: Request, res: Response) {
    const { email, password } = req.body;
  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
      return res.status(500).json({ 
        error: 'Failed to register user',
        message: error.message,
      });
    }
  }
  
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET || '';

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // generate a token and send back to client
      /* const token = jwt.sign(
        { userId: user.id }, 
        jwtSecret, 
        { expiresIn: '1h' }
        );
      res.status(200).json({ token }); */

      // set the jwt.payload inside of http only cookie
      const payload = {
        userId: user.id,
        //roles: 
      };

      const token = jwt.sign(
        payload,
        jwtSecret,
        {expiresIn: '1h'}
      );
        
      // set http only cookie
      res.cookie(
        'accessToken',
        token, 
        {
          // use HTTPS in production for encrypted communication
          httpOnly: true,
          maxAge: 60 * 60 * 24, // 1 day
          secure: process.env.NODE_ENV === 'production',
        }
      );

      res.status(200).json({ 
        msg: "Login successful!", 
        //accessToken: token 
      });
    } catch(error: any) {
      return res.status(500).json({ 
        error: 'Failed to login user',
        message: error.message,
      });
    }
  }

  // /logout
  static logout(req: Request, res: Response, next: NextFunction) {

  }

  // authenticate user middleware
  public static guardAuthToken(req: Request, res: Response, next: NextFunction) {
    //const authHeader = req.headers['authorization'];
    // get the token out of header string
    //const token: string | undefined = authHeader && authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET || '';

    // get token from cookies
    const token = req.cookies?.accessToken;

    // if there is no token
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // verify auth token
    jwt.verify(token, jwtSecret, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ error: 'Token is not valid' });
      }
      
      // set req.user to => user comming from jwt.token
      (req as any).user = user;
      next();
    });
  }
}

export default AuthController