// Generate random coordinates within a radius around a center point
export const getRandomCoordinate = (center: [number, number], radiusDegrees: number = 2): [number, number] => {
  const [lat, lng] = center;
  return [
    lat + (Math.random() * 2 - 1) * radiusDegrees,
    lng + (Math.random() * 2 - 1) * radiusDegrees
  ];
};

// Get marker color based on type
export const getMarkerColor = (type: string): string => {
  switch (type) {
    case 'project':
      return '#1e805d'; // primary color
    case 'tender':
      return '#3b82f6'; // blue
    case 'auction':
      return '#ef4444'; // red
    case 'job':
      return '#8b5cf6'; // purple
    default:
      return '#6b7280'; // gray
  };
};