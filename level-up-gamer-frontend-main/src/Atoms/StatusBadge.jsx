import { Badge } from 'react-bootstrap';

function StatusBadge({ status }) {
  const variant = status === 'Activo'
    ? 'success'
    : status === 'Bajo stock' || status === 'Inactivo'
      ? 'warning'
      : 'danger';

  return <Badge bg={variant}>{status}</Badge>;
}

export default StatusBadge;
