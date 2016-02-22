from setuptools import setup, find_packages

version = '0.1 demo'

setup(
    name='open-corroborator',
    version=version,
    long_description=open("README.md").read(),
    packages=find_packages(exclude=['ez_setup']),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'setuptools',
        'Django<1.6',
        #todo 
        #'South',

        # Third Party Standard
        #'gunicorn',
    ],
    scripts=[
        'manage.py',
    ],
    )
