InputLayer((256,256,3))
ZeroPadding2D(padding=((3, 3), (3, 3)), name='conv1_pad')
Conv2D(64, 7, strides=2, use_bias=use_bias, name='conv1_conv')
if not preact:
  layers.BatchNormalization(axis=bn_axis, epsilon=1.001e-5, name='conv1_bn')
  layers.Activation('relu', name='conv1_relu')
ZeroPadding2D(padding=((1, 1), (1, 1)), name='pool1_pad')
MaxPooling2D(3, strides=2, name='pool1_pool')

x = stack_fn(x)

if preact:
  BatchNormalization(axis=bn_axis, epsilon=1.001e-5, name='post_bn')
  Activation('relu', name='post_relu')

if include_top:
  GlobalAveragePooling2D(name='avg_pool')
  Dense(classes, activation=classifier_activation,name='predictions')
else:
  if pooling == 'avg':
    GlobalAveragePooling2D(name='avg_pool')
  elif pooling == 'max':
    GlobalMaxPooling2D(name='max_pool')

def stack_fn(x):
  x = stack1(x, 64, 3, stride1=1, name='conv2')
  x = stack1(x, 128, 4, name='conv3')
  x = stack1(x, 256, 23, name='conv4')
  return stack1(x, 512, 3, name='conv5')

def stack1(x, filters, blocks, stride1=2, name=None):
  x = block1(x, filters, stride=stride1, name=name + '_block1')
  for i in range(2, blocks + 1):
    x = block1(x, filters, conv_shortcut=False, name=name + '_block' + str(i))
  return x


def block1(x, filters, kernel_size=3, stride=1, conv_shortcut=True, name=None):
  if conv_shortcut:
    shortcut = layers.Conv2D(4 * filters, 1, strides=stride, name=name + '_0_conv')(x)
    shortcut = layers.BatchNormalization(axis=bn_axis, epsilon=1.001e-5, name=name + '_0_bn')(shortcut)
  else:
    shortcut = x

  Conv2D(filters, 1, strides=stride, name=name + '_1_conv')
  BatchNormalization(axis=bn_axis, epsilon=1.001e-5, name=name + '_1_bn')
  Activation('relu', name=name + '_1_relu')(x)
  Conv2D(filters, kernel_size, padding='SAME', name=name + '_2_conv')
  BatchNormalization(axis=bn_axis, epsilon=1.001e-5, name=name + '_2_bn')
  Activation('relu', name=name + '_2_relu')
  Conv2D(4 * filters, 1, name=name + '_3_conv')
  BatchNormalization(axis=bn_axis, epsilon=1.001e-5, name=name + '_3_bn')
  Add(name=name + '_add')([shortcut, x])
  Activation('relu', name=name + '_out')
  return x


'''InputLayer
Dense
stack_fn
stack1
block1
Conv2D
GlobalAveragePooling2D
MaxPooling2D
ZeroPadding2D
BatchNormalization
Activation'''  