import PersistentDrawerLeft from './persistentDrawerLeft/persistentDrawerLeft'; 

interface IPersistentDrawerLeftWrapper {
  items: string[];       
}

const PersistentDrawerLeftWrapper: React.FC<IPersistentDrawerLeftWrapper> = ({ items }) => {
  return <PersistentDrawerLeft items={items} />;
}
export default PersistentDrawerLeftWrapper;
