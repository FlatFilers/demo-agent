# Securely store and use credentials

---

Secrets enable the secure sharing of credentials with listener implementations, all without requiring developers to have direct knowledge of the secret values in advance.

These values are established within the user interface but are accessed through the SDK or API.

## Making this Space

This Space has been configured with a Secret.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { Client, FlatfileEvent, FlatfileListener } from "@flatfile/listener";

export default function flatfileEventListener(listener: Client) {
  listener.filter({ job: "space:configure" }, (configure: FlatfileListener) => {
    configure.on(
      "job:ready",
      async ({ context: { spaceId, environmentId, jobId } }: FlatfileEvent) => {
        try {
          await api.jobs.ack(jobId, {
            info: "Job started.",
            progress: 10,
          });

          await api.secrets.upsert({
            environmentId,
            spaceId,
            name: "My First Secret",
            value: "My Super Secret Value",
          });

          await api.jobs.complete(jobId, {
            outcome: {
              message: "Job completed.",
            },
          });
        } catch (error: any) {
          await api.jobs.fail(jobId, {
            outcome: {
              message: "Job error.",
            },
          });
        }
      }
    );
  });
}

```

## Things you can do here

Go to the Secrets tab of this space and check out the Secret that has been populated. This secret is then can then be accessed in your Listener configuration and used to interact with external resources requiring credentials.

## Further documentation

Read more about securely storing use credentials in your configuration [here](https://flatfile.com/docs/guides/secrets).

## Learn more about Flatfile by trying our [other demos](https://platform.flatfile.com/getting-started)
