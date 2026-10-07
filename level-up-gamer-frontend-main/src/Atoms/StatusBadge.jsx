import { Badge } from 'react-bootstrap';
import { getStatusBadgeVariant } from '../domain.js';

function StatusBadge({ status }) {
  const variant = getStatusBadgeVariant(status);
  return <Badge bg={variant}>{status}</Badge>;
}

export default StatusBadge;
