import converter from '../converters/metric-imperial'

export default (req, res) => {
  const { input } = req.query;
  
  const result = converter.processExpression(input);
  
  if(result.error) {
    res.status(400).json(result)
    return;
  }
  
  res.json(result)
}