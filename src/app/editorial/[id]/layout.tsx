export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: 'architecture-of-silence' }
  ];
}

export default function EditorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
