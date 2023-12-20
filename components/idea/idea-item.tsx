'use client';
import { formatDistance } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Idea } from '@/lib/types';
import { Badge } from '../ui/badge';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import ItemInfo from '../shared/items-info';

const IdeaItem = ({ idea }: { idea: Idea }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='cursor-pointer bg-transparent shadow-none transition hover:border-primary'>
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
            <CardDescription>
              <time>
                {formatDistance(new Date(idea.createdAt ?? ''), new Date(), {
                  addSuffix: true,
                })}
              </time>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='line-clamp-3'>
              {idea.description ? idea.description : 'No description'}
            </p>
          </CardContent>
          <CardFooter className='flex-wrap gap-1.5'>
            {idea.tags?.split(',').map((tag: string) => (
              <Badge
                key={tag}
                variant='secondary'
                className='whitespace-nowrap'
              >
                {tag}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      </DialogTrigger>
      <ItemInfo type='idea' id={idea.id} />
    </Dialog>
  );
};

export default IdeaItem;
