/**
 * @Entity Message
 */
export const Message = ({
  user = String(""),
  text_content = String(""),
  image_url = String(""),
}) => ({
  user,
  text_content,
  image_url,
});
