
type FixedElementProps = {
  children: React.ReactNode
};

const FixedElement = ({children}: FixedElementProps) => {
  return <div className="fixed right-4 bottom-4">
    {children}
  </div>
}

export default FixedElement;