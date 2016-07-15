(function() {
  'use strict';

  angular
    .module('kai')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $scope, $log, $location, kaiService, storage, modalService) {
    // var vm = this;
    var store = storage.getStore('common');
    var token = store.getItem('token');
    var profileId = store.getItem('profileId');
    console.log('Token is ', token);
    if (!token) {
        console.log('Redirect to login')
        $location.path('/login');
        return;
    }

    $scope.datepickerVisiblity = false;
    $scope.datepickerDate;

    function compare(a,b) {
      if (a.title < b.title)
        return -1;
      if (a.title > b.title)
        return 1;
      return 0;
    }

    $scope.loadCompanies = function() {
      kaiService.getCompanies().then(function(data) {
        $scope.companies = data.data;
        $scope.companies.sort(compare);
        for (var i in $scope.companies) {
          var comp = $scope.companies[i];
          (function(index) {
            if (comp.owner) {
              kaiService.getProfile(comp.owner).then(function(data) {
                $scope.companies[index].ownerProfile = data.data;
              })
            }
          })(i);
        }
        // $scope.companies = [];
        console.log('Companies are ', $scope.companies)
      });
    }

    $scope.loadCompanies();

    kaiService.getProfile(profileId).then(function(data) {
      $scope.profile = data.data;
      console.log('Profile are ', $scope.profile)
    });

    $scope.formatDate = function(date) {
      return moment(date).format("DD MMMM YYYY");
    }

    $scope.toggleCompany = function(companyId) {
      console.log('Toggle company', companyId)
      if ($scope.selectedCompany && $scope.selectedCompany === companyId) {
        delete $scope.selectedCompany;
      } else {
        $scope.selectedCompany = companyId;
      }
    }

    $scope.getSelectedClass = function(companyId) {
      if ($scope.selectedCompany) {
        if (companyId === $scope.selectedCompany) {
          return 'company-selected';
        } else {
          return 'company-muted';
        }
      }
    }

    $scope.getLoggedUser = function() {
      if ($scope.profile) {
        if ($scope.profile.first_name && $scope.profile.last_name) {
          return $scope.profile.first_name + ' ' + $scope.profile.last_name;
        }
        if ($scope.profile.email) {
          return $scope.profile.email;
        }
      }
    }

    $scope.saveCompany = function(companyId) {
      for (var i in $scope.companies) {
        var company = $scope.companies[i];
        (function(company) {
          if (company.id === companyId) {
            // New company
            if (company.id === -1) {
              console.log('Create new company', company, company.ownerProfile);
              kaiService.createProfile(company.ownerProfile).then(function(data) {
                console.log('Created result', data);
                company.owner = data.data.profile_id;
                kaiService.createCompany(company).then(function(data) {
                  $scope.resetSavingState();
                }).catch(function(error) {
                  console.error('Error while creating company ', company, error);
                  $scope.resetSavingState();
                })
              }).catch(function(error) {
                console.error('Error while creating profile ', company.ownerProfile, error);
                kaiService.createCompany(company).then(function(data) {
                  $scope.resetSavingState();
                }).catch(function(error) {
                  console.error('Error while creating company ', company, error);
                  $scope.resetSavingState();
                })
                $scope.resetSavingState();
              })
            } else {
              console.log('Save company', company);
              kaiService.saveCompany(company).then(function(data) {
                if (company.owner) {
                  console.log('Save profile', company.owner, company.ownerProfile);
                  kaiService.saveProfile(company.ownerProfile).then(function(data) {
                    $scope.resetSavingState();
                  }).catch(function(error) {
                    console.error('Error while saving company ' + company.id + ' owner ', company.ownerProfile, error);
                    $scope.resetSavingState();
                  })
                } else {
                  console.log('Want to create owner profile', company.ownerProfile);
                  kaiService.createProfile(company.ownerProfile).then(function(data) {
                    console.log('Created result', data);
                    company.owner = data.data.profile_id;
                    kaiService.saveCompany(company).then(function(data) {
                      $scope.resetSavingState();
                    }).catch(function(error) {
                      console.error('Error while saving company ', company, error);
                      $scope.resetSavingState();
                    })
                  }).catch(function(error) {
                    console.error('Error while creating profile ', company.ownerProfile, error);
                    kaiService.saveCompany(company).then(function(data) {
                      $scope.resetSavingState();
                    }).catch(function(error) {
                      console.error('Error while saving company ', company, error);
                      $scope.resetSavingState();
                    })
                  })
                }
              }).catch(function(error) {
                console.error('Error while saving company ' + company.id, error);
                $scope.resetSavingState();
              })
            }
          }
        })(company);
      }
    }

    $scope.resetSavingState = function() {
      delete $scope.selectedCompany;
      $scope.loadCompanies();
    }

    $scope.removeCompany = function(companyId) {
      modalService.confirm({
          text: 'Are you sure you want to delete this company and all it’s data?',
          func: function(){
              kaiService.removeCompany(companyId).then(function(data) {
                modalService.close();
                $scope.resetSavingState();
              }).catch(function(error) {
                console.error('Error while removing company ' + companyId, error);
              })
          }
      });
    }

    $scope.createCompany = function() {
      var company = {
        id: -1,
        license_to_date: moment().format("YYYY-MM-DD")
      }
      $scope.companies.unshift(company);
      $scope.selectedCompany = -1;
    }

  }
})();
