import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const Overview = (props: Props) => {
  return (
    <div className="h-5/6 flex items-center justify-center flex-col ">
      <h1 className="text-6xl font-semibold text-center text-primary mb-5">
        Team productivity <br />
        made simple
      </h1>
      <p className="max-w-2xl text-center text-lg text-muted-foreground mb-10">
        Keep track of your shared tasks, projects, and deadlines. Trusted by
        teams who have better things to do than overcomplicate it.
      </p>
      <Button className="mb-3">Start for free</Button>
      <p className="text-muted-foreground">
        Then $6 per member/month billed yearly
      </p>
    </div>
  );
};

export default Overview;
