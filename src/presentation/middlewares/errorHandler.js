
const errorHandler = (err, req, res, next) =>
{
  if (err?.message.includes('Not Found')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.message.includes('Login failed')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.message.includes('User Has Cart Already')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.message.includes('Role Already Added')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.message.includes('Product Already Added')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.message.includes('Empty Cart')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.message.includes('User is already premium')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.message.includes('User Docs Incompleted')){
    req.logger.error(err.stack);
    return res.status(404).json({ message: err.message });
  }else if (err?.name.includes('ZodError')){
    console.error(err.stack);
    return res.status(400).json({ message: err.issues });
  }

  req.logger.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error' });
};

export default errorHandler;