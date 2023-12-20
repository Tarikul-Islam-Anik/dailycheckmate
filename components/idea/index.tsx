'use client';

import GetIdeas from './get-ideas';
import { ScrollArea } from '../ui/scroll-area';

const IdeaList = () => {
  return (
    <ScrollArea
      className='h-[calc(100vh-16rem)] rounded-xl rounded-br-none rounded-tr-none pr-4'
      scrollHideDelay={0}
    >
      <GetIdeas />
    </ScrollArea>
  );
};

export default IdeaList;
