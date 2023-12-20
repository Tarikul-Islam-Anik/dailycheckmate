import { format } from 'date-fns';
import { Box, Flex, Heading } from '@radix-ui/themes';
import IdeaList from '@/components/idea';
import TodoList from '@/components/todos';
import CreateNew from '@/components/shared/create-new';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const MiddleColumn = () => {
  return (
    <Flex direction='column' gap='4' py='6'>
      <Flex justify='between' align='center' width='100%'>
        <Flex direction='column' gap='1'>
          <Heading size='8'>Today&apos;s Schedule</Heading>
          <Heading size='8' className='text-primary'>
            {format(new Date(), 'eeee, do')}
          </Heading>
        </Flex>
        <CreateNew />
      </Flex>
      <Box mt='5' position='relative'>
        <Tabs defaultValue="todos" className='w-full'>
          <TabsList className='mb-5'>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
          </TabsList>
          <TabsContent value="todos">
            <TodoList />
          </TabsContent>
          <TabsContent value="ideas">
            <IdeaList />
          </TabsContent>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default MiddleColumn;
