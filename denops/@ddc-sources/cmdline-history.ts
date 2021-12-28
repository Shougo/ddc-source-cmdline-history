import {
  BaseSource,
  Candidate,
  Context,
  DdcOptions,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v0.15.0/types.ts#^";
import { Denops } from "https://deno.land/x/ddc_vim@v0.15.0/deps.ts#^";

type Params = {
  maxSize: number;
};

export class Source extends BaseSource<Params> {
  async gatherCandidates(args: {
    denops: Denops;
    context: Context;
    options: DdcOptions;
    sourceOptions: SourceOptions;
    sourceParams: Params,
    completeStr: string;
  }): Promise<Candidate[]> {
    const p = args.sourceParams as unknown as Params;
    const maxSize = p.maxSize;
    const histories = await args.denops.call(
      "ddc_cmdline_history#get", maxSize
    ) as string[];
    const inputLength = args.context.input.length - args.completeStr.length;
    const input = args.context.input.substring(0, inputLength);
    return histories.filter((word) => word.startsWith(input))
      .map((word) => ({ word: word.substring(inputLength) })).reverse();
  }

  params(): Params {
    return {
      maxSize: 1000,
    };
  }
}
