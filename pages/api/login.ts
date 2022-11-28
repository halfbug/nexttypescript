import cookie from 'cookie';

export default async (req : any, res: any) => {
  if (req.method === 'GET') {
    const { rurl, st: token } = req.query;
    console.log(req.query);
    // res.status(200).json({ user: req.query });
    // Set Cookie
    await res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/',
      }),
    );
    // res.setHeader('Authorization', `Bearer ${token}`);
    res.redirect(rurl);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
