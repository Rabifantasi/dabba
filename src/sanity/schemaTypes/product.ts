const productSchema = {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Product Price',
    },
    {
      name: 'id',
      type: 'number',
      title: 'Custom ID', // You can keep this if you need a custom ID
    },
    {
      name: 'image',
      type: 'image',
      title: 'Product Image',
      options: {
        hotspot: true, // Enables cropping and focal point selection
      },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Category 1', value: 'category1' },
          { title: 'Category 2', value: 'category2' },
          { title: 'Category 3', value: 'category3' },
          // Add more categories as needed
        ],
      },
    },
    {
      name: 'popularity',
      type: 'string',
      title: 'Popularity',
      options: {
        list: [
          { title: 'High', value: 'high' },
          { title: 'Medium', value: 'medium' },
          { title: 'Low', value: 'low' },
        ],
      },
    },
  ],
};

export default productSchema;
