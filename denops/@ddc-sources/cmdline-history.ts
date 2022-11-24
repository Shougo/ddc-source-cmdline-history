import {
  BaseSource,
  Context,
  DdcOptions,
  Item,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v3.2.0/types.ts";
import { Denops } from "https://deno.land/x/ddc_vim@v3.2.0/deps.ts";

type Params = {
  maxSize: number;
};

export class Source extends BaseSource<Params> {
  override async gather(args: {
    denops: Denops;
    context: Context;
    options: DdcOptions;
    sourceOptions: SourceOptions;
    sourceParams: Params;
    completeStr: string;
  }): Promise<Item[]> {
    const p = args.sourceParams as unknown as Params;
    const maxSize = p.maxSize;
    const histories = await args.denops.call(
      "ddc_cmdline_history#get",
      maxSize,
    ) as string[];
    const inputLength = args.context.input.length - args.completeStr.length;
    const input = args.context.input.substring(0, inputLength);
    return histories.filter(
      (word) =>
        word.startsWith(input) && word.indexOf("\r") < 0 &&
        word.indexOf("\n") < 0,
    )
      .map((word) => ({ word: word.substring(inputLength) }));
  }

  override params(): Params {
    return {
      maxSize: 1000,
    };
  }
}
