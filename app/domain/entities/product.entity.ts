/**
 * @Entity Article
 */
export const Article = ({
  id = Number(-1),
  name = String("No title"),
  price = Number(0),
  color = String("No color"),
  description = String("No description"),
  image = String("No image"),
}) => ({
  id,
  name,
  price,
  color,
  description,
  image,
});
