# environme-github-action
Separate out the parts that change Github action

## Inputs

### `path`

**Required** wildcard path to template files that will be used to generate output. Default `&ast;`.

### `targetEnvironment`

**Not Required** Environment key used to override configuration in properties object that will be replaced into template file. Default [empty]


## Example usage

Environme uses the following convention to locate static files and update their content

Suppose I had the following 2 files:

static-page.template.html
```html
<!DOCTYPE html>
<html>
<body>
 <div>
   <img src="{$ config.url $}"/>
 </div>
  </body>
</html>
```

static-page.props.yml
``` yml
config:
  url: https://www.petguide.com/wp-content/uploads/2019/05/meanest-cat-breeds-bengal.jpg
  TEST:
    url: https://www.petguide.com/wp-content/uploads/2013/05/pitbull.jpg
  PROD:
    url: https://www.petguide.com/wp-content/uploads/2013/02/dalmatian-11-475x421.jpg
```

Environme will look for files that have **&ast;.template** in the name and then find the coresponding **&ast;.props.yml** file, and use these 2 files to produce the corespondin output file

So say we have a file called **static-page.template.html** and props file called **static-page.props.yml**, and both are in the folder static-content, running the following command:

```yml
uses: urbanantics/environme-github-action@v1
with:
  path: 'static-content/*'
  targetEnvironment: PROD
```

will match:
```
  static-content/static-page.template.html
  static-content/static-page.props.yml
```

and produce the following file:
```
  static-content/static-page.html
```

with the folowing content:

```html
<!DOCTYPE html>
<html>
<body>
 <div>
   <img src="https://www.petguide.com/wp-content/uploads/2013/02/dalmatian-11-475x421.jpg"/>
 </div>
  </body>
</html>
```

 <div>
   <img src="https://www.petguide.com/wp-content/uploads/2013/02/dalmatian-11-475x421.jpg"/>
 </div>

```yml
uses: urbanantics/environme-github-action@v1
with:
  path: 'static-content/*'
  targetEnvironment: TEST
```

will produce

 <div>
   <img src="https://www.petguide.com/wp-content/uploads/2013/05/pitbull.jpg"/>
 </div
  
  
and running the command with no targetEnvironment will produce the default

```yml
uses: urbanantics/environme-github-action@v1
with:
  path: 'static-content/*'
```

 <div>
   <img src="https://www.petguide.com/wp-content/uploads/2019/05/meanest-cat-breeds-bengal.jpg"/>
 </div
 

## Community :

Having problems? want to contribute? email me@reubenhutton.com

