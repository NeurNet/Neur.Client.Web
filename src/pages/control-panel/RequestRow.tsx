import type { Request } from '@/api/request';
import { useState } from 'react';
import classes from './RequestRow.module.css';

export function RequestRow({ request }: { request: Request }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <tr key={request.id} className={classes.row} onClick={() => setExpanded(!expanded)}>
      <td>{new Date(request.created_at).toLocaleString()}</td>
      <td>
        {request.user.username} ({request.user.name} {request.user.surname})
      </td>
      <td>{request.model_name}</td>
      <td>{request.status}</td>
      <td>
        {request.message &&
          (expanded ? request.message.content : request.message.content.slice(0, 50) + '...')}
      </td>
    </tr>
  );
}
