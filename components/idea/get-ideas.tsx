'use client';

import { useAtom } from 'jotai';
import { Idea } from '@/lib/types';
import IdeaItem from './idea-item';
import { ideaAtom } from '@/lib/atom';
import Message from '../shared/message';
import { Grid } from '@radix-ui/themes';

const GetIdeas = () => {
  const [ideas] = useAtom(ideaAtom);

  return ideas.length > 0 ? (
    <Grid columns='3' gap='5'>
      {ideas.map((idea: Idea) => {
        return <IdeaItem key={idea.id} idea={idea} />;
      })}
    </Grid>
  ) : (
    <Message
      message='No recent ideas found.'
      className='h-[calc(100vh-16rem)]'
    />
  );
};

export default GetIdeas;
