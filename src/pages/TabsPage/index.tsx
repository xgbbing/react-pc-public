import { StepsProvider } from '@/hooks/stepsInfoContext';
import TabsContent from './components/TabsContent';

const TabsPage: React.FC = () => {
  return (
    <StepsProvider>
      <TabsContent />
    </StepsProvider>
  );
};

export default TabsPage;
