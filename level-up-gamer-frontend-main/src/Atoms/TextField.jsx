import { Form } from 'react-bootstrap';

function TextField({
  id,
  label,
  error,
  groupClassName,
  as,
  ...controlProps
}) {
  return (
    <Form.Group className={groupClassName} controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control as={as} {...controlProps} />
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
}

export default TextField;
