import { CommonProvider } from '@/context/commonContext';
import TabsContent from './components/TabsContent';

const TabsPage: React.FC = () => {
  return (
    <CommonProvider>
      <TabsContent />
    </CommonProvider>
  );
};

export default TabsPage;
