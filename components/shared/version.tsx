'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import { Icons } from './icons';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from '../ui/scroll-area';
import { format } from 'date-fns';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';

const ENDPOINT = `https://api.github.com/repos/Tarikul-Islam-Anik/dailycheckmate/releases?per_page=5`;

type version = {
  tag_name: string;
  body: string;
  created_at: string;
};

const Version = () => {
  const [version, setVersion] = useState<version[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(ENDPOINT)
      .then((response) => {
        setVersion(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' className='m-4' disabled={loading || error}>
          <Flex gap='1' align='center' className='text-sm text-slate-400'>
            <Icons.branch className='h-3.5 w-3.5 fill-slate-400' />
            {loading ? (
              <Skeleton className='h-5 w-16' />
            ) : (
              <Text>
                {version ? version[0].tag_name : 'Failed to load version'}
              </Text>
            )}
          </Flex>
        </Button>
      </DialogTrigger>{' '}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center'>
            <CounterClockwiseClockIcon className='mr-2 h-5 w-5 text-muted-foreground' />
            <Text as='span'>Version History</Text>
          </DialogTitle>
          <DialogDescription className='prose prose-violet dark:prose-invert prose-h2:my-2'>
            <ScrollArea className='mt-4 h-[500px]'>
              {version &&
                version.map((version) => (
                  <Box key={version.tag_name}>
                    <Flex justify='between' align='center'>
                      <h2>{version.tag_name}</h2>
                      <time
                        className='mr-4 text-sm text-muted-foreground'
                        dateTime={version.created_at}
                      >
                        {format(new Date(version.created_at), 'MMMM dd, yyyy')}
                      </time>
                    </Flex>
                    <ReactMarkdown>{version.body}</ReactMarkdown>
                  </Box>
                ))}
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Version;
