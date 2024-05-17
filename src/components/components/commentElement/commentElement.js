import commentTemplate from './commentElement.hbs';

export function renderCommentElement(comment) {
  return commentTemplate(comment)
}