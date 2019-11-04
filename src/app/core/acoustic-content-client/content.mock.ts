const mockContent = {
  keywords: [],
  libraryId: 'default',
  creatorId: '3338d651-3ca9-4fc6-ae3a-9a06333e35b5',
  description: '',
  type: 'Article',
  locale: 'en',
  lastModifierId: '3338d651-3ca9-4fc6-ae3a-9a06333e35b5',
  links: {
    thumbnail: {
      href: '/authoring/v1/resources/7e0e1db4-12cb-4962-835f-39875bf2d9af '
    },
    retire: {
      href: '/authoring/v1/changes/content/60da4048-05f1-46ef-8f61-51cd88c2cc3b/status/retire'
    },
    draft: {
      href: '/authoring/v1/content/60da4048-05f1-46ef-8f61-51cd88c2cc3b:draft'
    },
    self: {
      href: '/authoring/v1/content/60da4048-05f1-46ef-8f61-51cd88c2cc3b'
    },
    type: {
      href: '/authoring/v1/types/c723cc24-cc81-4430-961b-5199e40f5e2c'
    }
  },
  id: '60da4048-05f1-46ef-8f61-51cd88c2cc3b',
  systemModified: '2019-10-21T10:35:47.897Z',
  rev: '1-782f6a562b18ac7a74398f977c914b95',
  thumbnail: {
    id: '93e53db5-55dd-41de-a775-e91d2527f59e',
    url: '/api/3dcf776b-6f21-47fa-839d-f741bc6652bb/delivery/v1/resources/7e0e1db4-12cb-4962-835f-39875bf2d9af '
  },
  kind: [],
  created: '2019-10-21T10:33:35.024Z',
  classification: 'content',
  tags: [],
  selectedLayouts: [
    {
      layout: {
        id: 'design-article-layout'
      }
    }
  ],
  elements: {
    heading: {
      elementType: 'text',
      value: 'YOLO'
    },
    author: {
      elementType: 'text',
      value: 'Leeroy Jenkins'
    },
    body: {
      values: [
        '<p>LEEEEEEEEEERROOOOOOOOOOY</p>',
        '<p>JEEENKINNNNSSSS</p>',
      ],
      elementType: 'formattedtext'
    },
    date: {
      elementType: 'datetime',
      value: '2009-04-30T13:05:00Z'
    },
    mainImage: {
      elementType: 'group',
      value: {
        leadImage: {
          mode: 'shared',
          profiles: [
            'fc822d77-e984-46c3-8d8d-970c41897d68'
          ],
          renditions: {
            lead: {
              source: '/delivery/v1/resources/b7e0f80752ea5bb4eeb998004a41ad36?resize=1200px:813px&crop=1200:624;0,95',
              width: 1200,
              height: 624,
              transform: {
                scale: 0.6,
                crop: {
                  x: 0,
                  y: 95,
                  width: 1200,
                  height: 624
                }
              },
              url: '/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg?resize=1200px%3A813px&crop=1200%3A624%3B0%2C95'
            },
            card: {
              source: '/delivery/v1/resources/b7e0f80752ea5bb4eeb998004a41ad36?resize=640px:434px&crop=640:360;0,37',
              width: 640,
              height: 360,
              transform: {
                scale: 0.32,
                crop: {
                  x: 0,
                  y: 37,
                  width: 640,
                  height: 360
                }
              },
              url: '/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg?resize=640px%3A434px&crop=640%3A360%3B0%2C37'
            },
            default: {
              width: 2000,
              source: '/delivery/v1/resources/b7e0f80752ea5bb4eeb998004a41ad36',
              height: 1355,
              url: '/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg'
            }
          },
          asset: {
            fileName: 'GettyImages-184315668.jpg',
            altText: 'Modern living room',
            fileSize: 603434,
            width: 2000,
            mediaType: 'image/jpeg',
            id: 'ca1c0811-7430-4b9b-82ee-e82f9d929361',
            resourceUri: '/delivery/v1/resources/b7e0f80752ea5bb4eeb998004a41ad36',
            height: 1355
          },
          elementType: 'image',
          url: '/3dcf776b-6f21-47fa-839d-f741bc6652bb/dxresources/b7e0/b7e0f80752ea5bb4eeb998004a41ad36.jpg'
        },
        leadImageCaption: {
          elementType: 'text',
          value: 'Rookery, Upper Blackrock Spire'
        },
        leadImageCredit: {
          elementType: 'text',
          value: 'the Internetz'
        }
      },
      typeRef: {
        id: 'fe31fbf4-4bc4-4ffa-9b27-615af51d23fe'
      }
    }
  },
  name: 'Mock Article',
  typeId: 'c723cc24-cc81-4430-961b-5199e40f5e2c',
  lastModified: '2019-11-01T10:12:55.734Z',
  status: 'ready'
};

export default mockContent;
