import glamorous from 'glamorous';

export const ButtonReset = glamorous.button({
  border: 0,
  padding: 0,
  margin: 0,
  lineHeight: 'inherit',
  font: 'inherit',
  background: 'none',
  boxShadow: 'none',
  cursor: 'pointer',
  '&:focus': {
    outline: 0,
    '> img': {
      outline: '1px solid #fff',
    },
  },
});
