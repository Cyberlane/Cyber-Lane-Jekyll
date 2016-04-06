---
layout:      post
title:       Forwarding uploaded files to another service
category:    blog
updated:     2016-04-06
location:    Malmö, Sweden
tags:        [CSharp, Coding, Nancy, NancyFX, Services, File Upload, Async, Await, REST]
description: Receiving uploaded files from Nancy and sending them to another web service
---

I was playing around with a small project yesterday evening, where I was receiving uploaded files to my NancyFX service but needed to send those on to another web service, but this was not as simple as I had hoped. {{ more }}

So originally I had hoped there would be a content type you could send to the `HttpClient` object, which would allow you to add an array of files to be sent and it would just work, but unfortunately it was not that simple.

Fortunately, I was not the first person to encounter this problem and found somebody [on StackOverflow](http://stackoverflow.com/a/16908077/221456) with a simple solution to the problem, so I tried it with my code and it worked beautifully!

```csharp
        public UploadModule(IConfigurations configurations)
        {
#if (!DEBUG)
            this.RequiresAuthentication();
#endif
            
            Post["/upload", true] = async(_, token) =>
            {
                using (var content = new MultipartFormDataContent())
                using (var client = new HttpClient())
                {
                    foreach (var file in Request.Files)
                    {
                        content.Add(CreateFileContent(file.Value, file.Name, file.ContentType));
                    }

                    var response = await client.PostAsync(configurations.ImageServer, content);
                    response.EnsureSuccessStatusCode();
                    return HttpStatusCode.OK;
                }
            };
        }

        private StreamContent CreateFileContent(Stream stream, string fileName, string contentType)
        {
            var fileContent = new StreamContent(stream);
            fileContent.Headers.ContentDisposition = new ContentDispositionHeaderValue("form-data")
            {
                Name = "\"files\"",
                FileName = "\"" + fileName + "\""
            }; // the extra quotes are key here
            fileContent.Headers.ContentType = new MediaTypeHeaderValue(contentType);
            return fileContent;
        }
```