import Swal from 'sweetalert2';
import { useEffect } from 'react';

export const SwlErrors = ({ errorMessage }) => {
  console.log(errorMessage);

  useEffect(() => {
    if (!errorMessage) return;

    if (Array.isArray(errorMessage) && errorMessage.length > 0) {
      const formattedErrors = errorMessage
        .map(
          ({ msg }) =>
            `<div style="margin-bottom: 8px;">
               <span style="color: #d9534f;">${msg}</span>
            </div>`,
        )
        .join('');

      Swal.fire({
        title: 'Validation Errors',
        html: `<div>${formattedErrors}</div>`,
        icon: 'error',
      });
    } else if (typeof errorMessage === 'string') {
      Swal.fire('Authentication Error', errorMessage, 'error');
    }
  }, [errorMessage]);

  return null;
};
