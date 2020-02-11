var assert = require('assert');
var test = require('@urbanantics/environme/src/environme');
const fs = require('fs')

describe('Run environMe command to convert text files based on environment config', function () {
  it('Test basic environMe command', function () {

    // Arrange
    const templateContent = `<!DOCTYPE html>
    <html>
        <body>
            <div>
                <img src="{$ config.url $}"/>
            </div>
        </body>
    </html>`;

    const expectedContent = `<!DOCTYPE html>
    <html>
        <body>
            <div>
                <img src="https://www.petguide.com/wp-content/uploads/2013/05/pitbull.jpg"/>
            </div>
        </body>
    </html>`;

    const propsContent = `config:
    url: https://www.petguide.com/wp-content/uploads/2013/05/pitbull.jpg`;

    fs.writeFileSync("test/test.template.html", templateContent, 'utf8')
    fs.writeFileSync("test/test.props.yml", propsContent, 'utf8')
    
    // Act
    test.environMe("test/*", "PROD", true);

    // Assert
    const fileExists = fs.existsSync("test/test.html")
    const actualContent = fs.readFileSync("test/test.html", 'utf8')

    assert.equal(fileExists, true);
    assert.equal(actualContent, expectedContent);

    // Tidy
    //fs.unlinkSync("test/test.html")
    //fs.unlinkSync("test/test.template.html")
    //fs.unlinkSync("test/test.props.yml")


  });
});

/************************* Convert String Template *******************************/
describe('Replace Environment Variable References', function () {
    it('Replace Environment Variable References', function () {
  
      const flatObj = {
        seceret: "{$ seceretKey $}"
      };
  
      const envObj = {
        seceretKey: "1234"
      };
      const expectedObj = {
        seceret: "1234"
      };
  
      test.resolveVariableReferences(flatObj, envObj)
  
      assert.equal(JSON.stringify(flatObj), JSON.stringify(expectedObj));
    });
  });
  
  /************************* Flatten Object *******************************/
  describe('Flatten Object', function () {
    it('Basic Flatten Object', function () {
  
      const sourceObj = {
        a: {
          b: {
            c: "my_value"
          }
        }
      };
  
      const expectedObj = {
        "a_b_c": "my_value"
      };
  
      const flatObj = test.flattenObj(sourceObj)
  
      assert.equal(JSON.stringify(flatObj), JSON.stringify(expectedObj));
    });
  });
  
  /************************* Map Branches *******************************/
  describe('Test mapBranches', function () {
    it('Basic mapBranches Object', function () {
  
      const branchMapping = "develop=DEV,feature/=TEST,master=PROD";
  
      const currentBranch = "refs/heads/master";
  
      const environment = test.mapBranches(branchMapping, currentBranch)
  
      assert.equal(environment, "PROD");
    });
    it('Basic mapBranches Object 2', function () {
  
      const branchMapping = "develop=DEV,feature/=TEST,master=PROD";
  
      const currentBranch = "refs/heads/feature/my-feature";
  
      const environment = test.mapBranches(branchMapping, currentBranch)
  
      assert.equal(environment, "TEST");
    });
    it('Basic mapBranches missing mapping', function () {
  
      const branchMapping = "develop=DEV,feature/=TEST,master=PROD";
  
      const currentBranch = "refs/heads/release/my-feature";
  
      const environment = test.mapBranches(branchMapping, currentBranch)
  
      assert.equal(environment, "");
    });
    it('Basic mapBranches malformed mapping', function () {
  
      const branchMapping = "develop=DEV=TEST,feature/=TEST,master=PROD";
  
      const currentBranch = "refs/heads/develop";
  
      const environment = test.mapBranches(branchMapping, currentBranch)
  
      assert.equal(environment, "");
    });
  });
  