import React from "react";
import { Remark } from "react-remark";

const markdown =
  "We can use `git commit --amend` to make changes to our previous commit. But have you ever wondered what is the best way to fix an issue with an older git commit?  Follow along and we'll learn this amazing git hack\n\n# Here is how you can do it\n\n- Use `git log` to find the commit that you wish to fix. Copy the commit's hash as we will need it later. For example, \nif you want to fix the commit with the message `Added magic to code`, copy it's hash `6070a615f127fb0fe410db454251d7279c0eaa2c`\n\n```\ngit log\n```\n\n![carbon (1).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1622733221756/TxNo9jJWc.png)\n\n- Make changes to the files you wish to fix and stage them for committing using `git add <file paths>`. For example, if you made changes to `index.js`, add it using:\n\n```\ngit add index.js\n```\n\n![carbon (4).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1622733288866/mzQ3vtnAJ.png)\n\n- Now instead of using the regular commands to commit, use\n\n```\ngit commit --fixup=<hash of the older commit that we copied in step 1>\n```\n\nThis will create a `fixup!` commit.\n\n**Note** that this is where we deviate from the regular process of commiting\n\n\n![carbon (3).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1622733256352/OKUFm_3nU.png)\n\n- if you check your `git log`, you will see that a `!fixup` commit is created at the top\n\n\n![carbon (6).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1622733335648/_OGzMxvIH.png)\n\n- You can now automatically squash the fixup commit with the older commit using rebase with autosquash\n\n```\n$ git rebase -i <old commit hash>~1 --autosquash\n```\n\n- In the interactive rebase editor, you will see that the fixup commit would have automatically moved next to the old commit that we wanted to fix. \n\n![carbon (8).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1622733357425/vQ1NvTgiy.png)\n\n\n- Proceed with the rebase by closing the editor (as you usually do with a regular rebase). Resolve the merge conflicts if any.\n\nYou'll see that the older commit is updated with the changes you made in the fixup commit\n\nThat's it\n\n\n> For more regular tech content including updates on many of my interesting web dev side projects,  [follow me on twitter](https://twitter.com/therajatkapoor)  \n\n";

const EditorNew = () => {
  return (
    <Remark
      remarkToRehypeOptions={{ allowDangerousHtml: true }}
      rehypeReactOptions={{
        passNode: true,
        components: {
          p: (props) => {
            return (
              <p
                className="custom-paragraph"
                style={{ border: "1px solid red" }}
                {...props}
              />
            );
          },
        },
      }}
    >
      {markdown}
    </Remark>
  );
};

export default EditorNew;
