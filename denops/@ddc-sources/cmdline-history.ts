import {
  BaseSource,
  Candidate,
  Context,
  DdcOptions,
  SourceOptions,
} from "https://deno.land/x/ddc_vim@v0.15.0/types.ts#^";
import { Denops } from "https://deno.land/x/ddc_vim@v0.15.0/deps.ts#^";

export class Source extends BaseSource<{}> {
  async gatherCandidates(args: {
    denops: Denops;
    context: Context;
    options: DdcOptions;
    sourceOptions: SourceOptions;
    completeStr: string;
  }): Promise<Candidate[]> {
    const histories = await args.denops.call(
      "ddc_cmdline_history#get",
    ) as string[];
    const inputLength = args.context.input.length - args.completeStr.length;
    const input = args.context.input.substring(0, inputLength);
    return histories.filter((word) => word.startsWith(input))
      .map((word) => ({ word: word.substring(inputLength) }));
  }

  params(): {} {
    return {};
  }
}
