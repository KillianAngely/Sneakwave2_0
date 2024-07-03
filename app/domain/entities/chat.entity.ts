/**
 * @Entity Message
 */
export const Message = ({
  id = Number(-1),
  user = String(""),
  text_content = String(""),
  image_url = String(""),
}) => ({
  id,
  user,
  text_content,
  image_url,
});
