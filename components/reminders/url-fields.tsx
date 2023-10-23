import { useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const UrlFields = ({ form }: { form: any }) => {
  const {
    fields: urls,
    append,
    remove,
  } = useFieldArray({
    name: "links",
    control: form.control,
  });
  return (
    <div>
      {urls.map((field, index) => (
        <FormField
          control={form.control}
          key={field.id}
          name={`links.${index}.value`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn(index !== 0 && "sr-only")}>
                Urls
              </FormLabel>
              <FormDescription className={cn(index !== 0 && "sr-only")}>
                Add urls related to this reminder.
              </FormDescription>
              <FormControl>
                <div className="flex space-x-2 items-center">
                  <Input {...field} />{" "}
                  {index !== 0 && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      {urls.length < 5 && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() =>
            append({
              link: "",
            })
          }
        >
          Add {urls.length === 0 ? "a link" : "more"}
        </Button>
      )}
    </div>
  );
};

export default UrlFields;
