/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world'

exports.stripPrivateProperties = (properties, array) => {
  return array.map(obj => {
    return Object.keys(obj).reduce((acc, key) => {
      // only include properties that are not in the properties array
      if (!properties.includes(key)) {
        acc[key] = obj[key]
      }
      return acc
    }, {})
  })
}

exports.excludeByProperty = (property, array) => {
  return array.filter(obj => {
    // only include objects that do not have a given property
    return !Object.keys(obj).includes(property)
  })
}

exports.sumDeep = (array) => {
  return array.map(obj => {
    return {
      objects: obj.objects.reduce((acc, obj) => {
        acc += obj.val
        return acc
      }, 0),
    }
  })
}

exports.applyStatusColor = (colorMap, array) => {
  return array.map(obj => {
    // create a statusMap object for each status code based on colorMap
    const statusMap = Object.keys(colorMap).reduce((acc, key) => {
      colorMap[key].forEach(status => {
        acc[status] = key
      })
      return acc
    }, {})
    return {
      status: obj.status,
      color: statusMap[obj.status],
    }
  }).filter(obj => typeof obj.color !== 'undefined')
}

exports.createGreeting = (greetFn, greetings) => {
  return (name) => {
    return greetFn(greetings, name)
  }
}

exports.setDefaults = (defaults) => {
  return (obj) => {
    return Object.keys(defaults).reduce((acc, key) => {
      // if default property key now shown, add it to acc
      if (!Object.keys(acc).includes(key)) {
        acc[key] = defaults[key]
      }
      return acc
    }, obj)
  }
}

exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  try {
    const { fetchStatus, fetchUsers, fetchCompanyById } = services
    const status = await fetchStatus()
    const users = await fetchUsers()
    const user = users.find(user => user.name === name)
    const company = await fetchCompanyById(user.companyId)
    return { company, status, user }
  } catch (e) {
    return e
  }
}
