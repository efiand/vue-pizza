export function formatAddress({ street, house, apartment }) {
  return [
    street,
    house ? `д. ${house}` : "",
    apartment ? `кв. ${apartment}` : "",
  ]
    .filter(Boolean)
    .join(", ");
}
