export async function generateStaticParams() {
  return [
    { id: '1' }
  ];
}

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
