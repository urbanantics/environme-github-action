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
    test.environMe("test/*", "PROD")

    // Assert
    const fileExists = fs.existsSync("test/test.html")
    const actualContent = fs.readFileSync("test/test.html", 'utf8')

    assert.equal(fileExists, true);
    assert.equal(expectedContent, actualContent);

    // Tidy
    fs.unlinkSync("test/test.html")
    fs.unlinkSync("test/test.template.html")
    fs.unlinkSync("test/test.props.yml")


  });
});