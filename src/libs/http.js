class Http {
  static instance = new Http();

  get = async(url) => {
    try {
      let req = await fetch(url);
      let json = await req.json();

      return json;
    } catch(err) {
      console.error('http get method error', err);
      throw Error(err);
    }
  };

  post = async(url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body
      });
      let json = await req.json();

      return json;
    } catch(err) {
      console.error('http post method error', err);
      throw Error(err);
    }
  };

  put = async(url, body) => {
    try {
      let req = await fetch(url, {
        method: 'PUT',
        body
      });
      let json = await req.json();

      return json;
    } catch(err) {
      console.error('http put method error', err);
      throw Error(err);
    }
  };

  remove = async(url) => {
    try {
      let req = await fetch(url, {
        method: 'DELETE'
      });
      let json = await req.json();

      return json;
    } catch(err) {
      console.error('http delete method error', err);
      throw Error(err);
    }
  };
}

export default Http;
