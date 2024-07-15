export async function useVerification(token) {
  const res = await fetch(
    `${import.meta.env.VITE_BASE_API}/user/verification`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}
