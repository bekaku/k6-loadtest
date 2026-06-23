import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '15s', target: 10 },   // ramp up to 200 VUs
    // { duration: '30s', target: 200 },   // ramp up to 200 VUs
    // { duration: '1m',  target: 2000 },  // spike to 2000 VUs
    // { duration: '30s', target: 0 },     // ramp down
  ],
};

export default function () {
//   const res = http.get('http://localhost:8080/gd5-test');
  const res = http.get('http://host.docker.internal:8080/gd5-test');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 3000ms': (r) => r.timings.duration < 3000,
  });
}