interface MetadataRowProps {
  icon: string;
  label: string;
  children: React.ReactNode;
}

const MetadataRow = ({ icon, label, children }: MetadataRowProps) => {
  return (
    <>
      <span className="text-gray-400">{icon}</span>
      <span className="text-base font-medium text-gray-400">{label}</span>
      <div>{children}</div>
    </>
  );
};

export default MetadataRow;
