import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId:'tfv6nuvs',
    dataset:'production',
    apiVersion: '2022-03-10',
    useCdn:true,
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
    origin: '*',

})
const builder=imageUrlBuilder(client);
export const urlFor=(source)=>builder.image(source);

