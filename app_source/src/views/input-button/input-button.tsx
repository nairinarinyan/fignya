import { FC } from 'react';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

type Props = {
};

export const InputButton: FC<Props> = props => {
  return (
    <div className="">
      <h1 className="text-2xl mb-8">Input and Button sample view</h1>
      <div className="mb-4">
        <Input
          label="Email"
          placeholder="your@email.com"
        />
      </div>
      <div className="mb-4">
        <Input
          label="Password"
          placeholder="Your pa$$w0rd"
        />
      </div>
      <Button fluid>Login</Button>
    </div>
  );
};
