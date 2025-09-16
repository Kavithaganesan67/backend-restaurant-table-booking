export const getallRestaurants = () => {
  return `SELECT 
  r.id,
  r.name,
  r.address,
  r.phone,
  r.email,
  r.cuisine_type,
  r.description,
  r.image_url,
  r.rating,
  r.price_range,
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'day_of_week', h.day_of_week,
      'open_time', h.open_time,
      'close_time', h.close_time
    )
  ) AS hours
FROM restaurants r
LEFT JOIN restaurant_hours h 
  ON r.id = h.restaurant_id
GROUP BY r.id;`;
};
