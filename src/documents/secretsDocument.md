# Securely store and use credentials

---

Secrets enable the secure sharing of credentials with listener implementations, all without requiring developers to have direct knowledge of the secret values in advance.

These values are established within the user interface but are accessed through the SDK or API.

## Things you can do here

In the Developer Settings section, go to the Secrets tab of this space and check out the Secret that has been populated. This Secret can be accessed in your Listener and used to interact with external resources requiring credentials.

## Making this Space

This Space has been configured with a Secret.

Here's a look at the code that was used to create it:

```jsx
import api from "@flatfile/api";
import { FlatfileEvent, FlatfileListener } from "@flatfile/listener";

export default function flatfileEventListener(listener: FlatfileListener) {
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
        } catch (error) {
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

## Further documentation

Read more about securely storing use credentials in your configuration <a href="https://flatfile.com/docs/guides/secrets" target="_blank">here</a>.
## Learn more about Flatfile by trying our <a href="https://platform.flatfile.com/getting-started" target="_blank">other demos</a>
