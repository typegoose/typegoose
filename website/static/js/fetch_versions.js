/*
  Script to fetch the latest versions and add them to the dropdown
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function addVersions() {
  const baseUrl = '/typegoose/';

  // get all required elements and log a error if not found

  let versions_dropdown_ul = document.querySelector('div#versions_dropdown > ul');

  if (!versions_dropdown_ul) {
    console.error('Could not find versions dropdown!');

    return;
  }

  let current_version_a = document.querySelector('div#versions_dropdown > a');

  if (!current_version_a) {
    console.error('Could not find versions dropdown a!');

    return;
  }

  // get the current version from the div > a (name in the titlebar) as fallback
  let current_version = current_version_a.textContent;

  // try to load the versions json to fetch all versions, otherwise fallback to simple versions
  const versions = await fetch('/typegoose/versions.json')
    .then((v) => v.json())
    .catch((err) => {
      console.log('json fetch errored, using default', err);

      const fromurl = versionFromUrl();

      // if current version is not the baseurl, add a "latest" entry alongside the current version
      if (fromurl) {
        return {
          latest: '',
          [current_version]: fromurl,
        };
      }

      // only add the current version
      return {
        [current_version]: '',
      };
    });

  // debug log versions
  console.log('loaded versions', versions);

  // add all versions to the dropdown, assuming the versions are all sorted
  for (const [name, path] of Object.entries(versions)) {
    let a_elem = document.createElement('a');
    a_elem.textContent = name;
    a_elem.href = baseUrl + path;
    a_elem.className = 'dropdown__link';
    let li_elem = document.createElement('li');
    li_elem.appendChild(a_elem);

    versions_dropdown_ul.appendChild(li_elem);
  }
}

/**
 * try to parse the version from the current location
 * @returns "false" if not found", otherwise the baseurl of the version
 */
function versionFromUrl() {
  const caps = /^\typegoose\/versions\/(\d+\.x|beta)/.exec(window.location.pathname);

  if (caps) {
    return `${caps[1]}`;
  }

  return false;
}
